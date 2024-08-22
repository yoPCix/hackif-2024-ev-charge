using GMap.NET;
using GMap.NET.MapProviders;
using Microsoft.AspNetCore.Mvc;

namespace EvCharge.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class RouteController : ControllerBase
{
    private readonly ILogger<RouteController> _logger;

    public RouteController(ILogger<RouteController> logger)
    {
        _logger = logger;
        GoogleMapProvider.Instance.ApiKey = "AIzaSyAFC5epkIsQMgu7csc1HevgL3-XXysO16Y";
    }

    [HttpPost]
    [ProducesResponseType(typeof(GDirections), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get([FromBody] PointLatLng[] points)
    {
        if (points.Length < 2)
            return BadRequest("At least two points are required for a route.");
        var start = points[0];
        var end = points[^1];
        var waypoints = points[1..^1];

        var status = GoogleMapProvider.Instance.GetDirections(out var directions, start, waypoints, end, false, true, false, false, true);
        // read data from charging-stations.json
        if (status != DirectionsStatusCode.OK)
        {
            return BadRequest($"Status: {status}");
        }

        return Ok(directions);
    }

}