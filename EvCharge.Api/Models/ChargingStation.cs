namespace EV.Charge.Models;

public class ChargingStation
{
    public string Name { get; set; }
    public string Address { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public int ChargingSlotCount { get; set; }
    public string Status { get; set; }
}