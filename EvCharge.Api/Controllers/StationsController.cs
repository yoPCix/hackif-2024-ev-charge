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
            var stations = JsonConvert.DeserializeObject<List<ChargingStation>>(await System.IO.File.ReadAllTextAsync("Data/charging-stations.json"));
            return Ok(stations);
        }
    }
}
