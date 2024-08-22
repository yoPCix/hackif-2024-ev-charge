using EV.Charge.Models;
using Newtonsoft.Json;

namespace EvCharge.Api.Data;

public class PlacesRepository
{
    private const string RawPlacesPath = "Data/sightseeing.json";
    private const string SavedPlaces = "saved-places.json";

    public PlacesRepository()
    {
        File.Delete(SavedPlaces);
    }

    public async Task<IList<SightseeingPlace>> GetAllPlacesAsync()
    {
        if (await Task.Run(() => File.Exists(SavedPlaces)))
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

        await File.WriteAllTextAsync(SavedPlaces, JsonConvert.SerializeObject(places));

        return places;
    }

    public async Task SaveAllPlacesAsync(IEnumerable<SightseeingPlace> places)
    {
        await File.WriteAllTextAsync(SavedPlaces, JsonConvert.SerializeObject(places));
    }
}