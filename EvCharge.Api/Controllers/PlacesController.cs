using EV.Charge.Models;
using GMap.NET;
using GMap.NET.MapProviders;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using EvCharge.Api.Models;

namespace EvCharge.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlacesController : ControllerBase
{
    private readonly ILogger<StationsController> _logger;

    public PlacesController(ILogger<StationsController> logger)
    {
        _logger = logger;
    }

    [HttpGet]
    [ProducesResponseType(typeof(SightseeingPlace[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        // read data from charging-stations.json
        var places = await GetAllPlacesAsync();
        return Ok(places);
    }

    private static async Task<List<SightseeingPlace>?> GetAllPlacesAsync()
    {
        var rawPlaces = JsonConvert.DeserializeObject<List<SightseeingPlaceRaw>>(
            await System.IO.File.ReadAllTextAsync("Data/sightseeing.json"));

        return rawPlaces.Select(rawPlace => new SightseeingPlace
        {
            Address = rawPlace.Address,
            Name = rawPlace.Name,
            Latitude = double.Parse(rawPlace.GpsLocation.Split(',')[0]),
            Longitude = double.Parse(rawPlace.GpsLocation.Split(',')[1]),
        }).ToList();
    }

    [HttpPost("within/{distanceMeters}")]
    [ProducesResponseType(typeof(SightseeingPlace[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetClosePlaces([FromBody] GpsPath path, [FromRoute] int distanceMeters)
    {
        var allPlaces = await GetAllPlacesAsync();
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

/// <summary>
/// Google Polyline Converter (Encoder and Decoder)
/// </summary>
public static class GooglePolylineConverter
{
    /// <summary>
    /// Decodes the specified polyline string.
    /// </summary>
    /// <param name="polylineString">The polyline string.</param>
    /// <returns>A list with Locations</returns>
    public static IEnumerable<PointLatLng> Decode(string polylineString)
    {
        if (string.IsNullOrEmpty(polylineString))
            throw new ArgumentNullException(nameof(polylineString));

        var polylineChars = polylineString.ToCharArray();
        var index = 0;

        var currentLat = 0;
        var currentLng = 0;

        while (index < polylineChars.Length)
        {
            // Next lat
            var sum = 0;
            var shifter = 0;
            int nextFiveBits;
            do
            {
                nextFiveBits = polylineChars[index++] - 63;
                sum |= (nextFiveBits & 31) << shifter;
                shifter += 5;
            } while (nextFiveBits >= 32 && index < polylineChars.Length);

            if (index >= polylineChars.Length)
                break;

            currentLat += (sum & 1) == 1 ? ~(sum >> 1) : (sum >> 1);

            // Next lng
            sum = 0;
            shifter = 0;
            do
            {
                nextFiveBits = polylineChars[index++] - 63;
                sum |= (nextFiveBits & 31) << shifter;
                shifter += 5;
            } while (nextFiveBits >= 32 && index < polylineChars.Length);

            if (index >= polylineChars.Length && nextFiveBits >= 32)
                break;

            currentLng += (sum & 1) == 1 ? ~(sum >> 1) : (sum >> 1);

            yield return new PointLatLng(Convert.ToDouble(currentLat) / 1E5,
                Convert.ToDouble(currentLng) / 1E5
            );
        }
    }

    /// <summary>
    /// Encodes the specified locations list.
    /// </summary>
    /// <param name="locations">The locations.</param>
    /// <returns>The polyline string.</returns>
    public static string Encode(IEnumerable<PointLatLng> locations)
    {
        var str = new StringBuilder();

        var encodeDiff = (Action<int>)(diff =>
        {
            var shifted = diff << 1;
            if (diff < 0)
                shifted = ~shifted;

            var rem = shifted;

            while (rem >= 0x20)
            {
                str.Append((char)((0x20 | (rem & 0x1f)) + 63));

                rem >>= 5;
            }

            str.Append((char)(rem + 63));
        });

        var lastLat = 0;
        var lastLng = 0;

        foreach (var point in locations)
        {
            var lat = (int)Math.Round(point.Lat * 1E5);
            var lng = (int)Math.Round(point.Lng * 1E5);

            encodeDiff(lat - lastLat);
            encodeDiff(lng - lastLng);

            lastLat = lat;
            lastLng = lng;
        }

        return str.ToString();
    }
}