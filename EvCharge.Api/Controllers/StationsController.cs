using EV.Charge.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EvCharge.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StationsController : ControllerBase
    {
        private readonly ILogger<StationsController> _logger;

        public StationsController(ILogger<StationsController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        [ProducesResponseType(typeof(ChargingStation[]), StatusCodes.Status200OK)]
        public async Task<IActionResult> Get()
        {
            // read data from charging-stations.json
            var stationsRaw = JsonConvert.DeserializeObject<List<ChargingStationRaw>>(await System.IO.File.ReadAllTextAsync("Data/charging-stations.json"));

            var stations = stationsRaw?.Select(rawStation => new ChargingStation
            {
                Address = rawStation.Address,
                Name = rawStation.Name,
                Latitude = string.IsNullOrEmpty(rawStation.GpsLocation) ? null : double.Parse(rawStation.GpsLocation.Split(',')[0]),
                Longitude = string.IsNullOrEmpty(rawStation.GpsLocation) ? null : double.Parse(rawStation.GpsLocation.Split(',')[1]),
                ChargingSlotCount = rawStation.Stalls,
                Status = rawStation.FreeStalls > 0 ? "Available" : "Occupied"
            }).ToList();

            return Ok(stations);
        }
    }
}
