using EV.Charge.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using IOFile = System.IO.File;

namespace EvCharge.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class StationsController : ControllerBase
{
    private const string RawStationsPath = "Data/charging-stations.json";
    private const string SavedStations = "saved-stations.json";
    private readonly ILogger<StationsController> _logger;

    public StationsController(ILogger<StationsController> logger)
    {
        _logger = logger;
        IOFile.Delete(SavedStations);
    }

    [HttpGet]
    [ProducesResponseType(typeof(ChargingStation[]), StatusCodes.Status200OK)]
    public async Task<IActionResult> Get()
    {
        // read data from charging-stations.json

        return Ok(await GetAllStationsAsync());
    }


    [HttpPut("{id}/mark-as-visited")]
    public async Task<IActionResult> MarkAsVisited([FromRoute] string id)
    {
        var stations = await GetAllStationsAsync();
        var station = stations.FirstOrDefault(st => st.Id == id);
        if (station == null)
        {
            return NotFound();
        }

        station.IsVisited = true;

        await SaveAllStationsAsync(stations);

        return Ok(station);
    }


    [HttpPut("{id}/mark-as-unvisited")]
    public async Task<IActionResult> MarkAsUnvisited([FromRoute] string id)
    {
        var stations = await GetAllStationsAsync();
        var station = stations.FirstOrDefault(st => st.Id == id);
        if (station == null)
        {
            return NotFound();
        }

        station.IsVisited = false;

        await SaveAllStationsAsync(stations);

        return Ok(station);
    }

    private async Task<IList<ChargingStation>> GetAllStationsAsync()
    {
        if (await Task.Run(() => IOFile.Exists(SavedStations)))
        {
            return JsonConvert.DeserializeObject<List<ChargingStation>>(await System.IO.File.ReadAllTextAsync(SavedStations));
        }

        var stationsRaw = JsonConvert.DeserializeObject<List<ChargingStationRaw>>(await System.IO.File.ReadAllTextAsync(RawStationsPath));
        var stations = stationsRaw.Where(rawStation => !string.IsNullOrEmpty(rawStation.GpsLocation)).Select(rawStation => new ChargingStation
        {
            Id = rawStation.Id,
            Brand = rawStation.Brand,
            Address = rawStation.Address,
            Name = rawStation.Name,
            Latitude = double.Parse(rawStation.GpsLocation.Split(',')[0]),
            Longitude = double.Parse(rawStation.GpsLocation.Split(',')[1]),
            ChargingSlotCount = rawStation.Stalls,
            Power = rawStation.Power,
            Status = rawStation.FreeStalls > 0 ? "Available" : "Occupied"
        }).ToList();

        await IOFile.WriteAllTextAsync(SavedStations, JsonConvert.SerializeObject(stations));

        return stations;
    }

    private async Task SaveAllStationsAsync(IEnumerable<ChargingStation> stations)
    {
        await IOFile.WriteAllTextAsync(SavedStations, JsonConvert.SerializeObject(stations));
    }
}