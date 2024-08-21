using EV.Charge.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EvCharge.Api.Controllers
{
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
            var stations = JsonConvert.DeserializeObject<List<SightseeingPlace>>(await System.IO.File.ReadAllTextAsync("Data/sightseeing.json"));
            return Ok(stations);
        }
    }
}