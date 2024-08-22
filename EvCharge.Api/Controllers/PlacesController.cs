using EV.Charge.Models;
using EvCharge.Api.Data;
using EvCharge.Api.Helpers;
using EvCharge.Api.Models;
using GMap.NET;
using Microsoft.AspNetCore.Mvc;

namespace EvCharge.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlacesController : ControllerBase
{
    private readonly ILogger<PlacesController> _logger;
    private readonly PlacesRepository _placesRepository;

    public PlacesController(ILogger<PlacesController> logger, PlacesRepository placesRepository)
    {
        _logger = logger;
        _placesRepository = placesRepository;
    }

    [HttpGet]
    [ProducesResponseType(typeof(SightseeingPlace[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        // read data from sightseeing.json
        var places = await _placesRepository.GetAllPlacesAsync();
        return Ok(places);
    }

    [HttpPost("within/{distanceMeters}")]
    [ProducesResponseType(typeof(SightseeingPlace[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetClosePlaces([FromBody] GpsPath path, [FromRoute] int distanceMeters)
    {
        var allPlaces = await _placesRepository.GetAllPlacesAsync();
        var monuments = allPlaces.Where(place => place.Name.Contains("Freedom Monument")).ToList();
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


}
