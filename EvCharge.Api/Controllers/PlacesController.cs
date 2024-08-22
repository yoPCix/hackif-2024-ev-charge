using EV.Charge.Models;
using EvCharge.Api.Helpers;
using EvCharge.Api.Models;
using GMap.NET;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using IOFile = System.IO.File;

namespace EvCharge.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlacesController : ControllerBase
{
    private const string RawPlacesPath = "Data/sightseeing.json";
    private const string SavedPlaces = "saved-places.json";
    private readonly ILogger<PlacesController> _logger;

    public PlacesController(ILogger<PlacesController> logger)
    {
        _logger = logger;
        IOFile.Delete(SavedPlaces);
    }

    [HttpGet]
    [ProducesResponseType(typeof(SightseeingPlace[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        // read data from sightseeing.json
        var places = await GetAllPlacesAsync();
        return Ok(places);
    }

    [HttpPost("within/{distanceMeters}")]
    [ProducesResponseType(typeof(SightseeingPlace[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetClosePlaces([FromBody] GpsPath path, [FromRoute] int distanceMeters)
    {
        var allPlaces = await GetAllPlacesAsync();
        var monuments = allPlaces?.Where(place => place.Name.Contains("Freedom Monument")).ToList();
        // find all places that are within distanceMeters from the route
        var mapRoute = new MapRoute(GooglePolylineConverter.Decode(path.Polyline), "test");
        var closePlaces = monuments.Where(place => IsCloseToRoute(mapRoute, place, distanceMeters)).ToList();
        return Ok(closePlaces);
    }

    private bool IsCloseToRoute(MapRoute route, SightseeingPlace place, int distanceMeters)
    {
        var dist = DistanceTo(route.Points, new PointLatLng(place.Latitude, place.Longitude));
        // check if the place is within distanceMeters from the route
        return dist <= distanceMeters;
    }

    public static double? DistanceTo(List<PointLatLng> points, PointLatLng point)
    {
        if (points.Count < 2)
            return new double?();
        double num = MapRoute.DistanceToLinealRoute(points[0], points[1], point);
        for (int index = 2; index < points.Count; ++index)
        {
            double linealRoute = MapRoute.DistanceToLinealRoute(points[index - 1], points[index], point);
            if (linealRoute < num)
                num = linealRoute;
        }

        return new double?(num);
    }



    private async Task<IList<SightseeingPlace>> GetAllPlacesAsync()
    {
        if (await Task.Run(() => IOFile.Exists(SavedPlaces)))
        {
            return JsonConvert.DeserializeObject<List<SightseeingPlace>>(
                await System.IO.File.ReadAllTextAsync(SavedPlaces));
        }

        var rawPlaces =
            JsonConvert.DeserializeObject<List<SightseeingPlaceRaw>>(
                await System.IO.File.ReadAllTextAsync(RawPlacesPath));

        var places = rawPlaces.Where(rawPlace => !string.IsNullOrEmpty(rawPlace.GpsLocation)).Select(rawPlace =>
            new SightseeingPlace
            {
                Id = rawPlace.Id,
                Address = rawPlace.Address,
                Name = rawPlace.Name,
                Latitude = double.Parse(rawPlace.GpsLocation.Split(',')[0]),
                Longitude = double.Parse(rawPlace.GpsLocation.Split(',')[1]),
                Website = rawPlace.Website,
                Description = rawPlace.Description
            }).ToList();

        await IOFile.WriteAllTextAsync(SavedPlaces, JsonConvert.SerializeObject(places));

        return places;
    }

    private async Task SaveAllPlacesAsync(IEnumerable<SightseeingPlace> places)
    {
        await IOFile.WriteAllTextAsync(SavedPlaces, JsonConvert.SerializeObject(places));
    }
}
