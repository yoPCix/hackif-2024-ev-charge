namespace EV.Charge.Models;

public class ChargingStationRaw
{
    public string Name { get; set; }
    public string Address { get; set; }
    public string GpsLocation { get; set; }
    public int Stalls { get; set; }
    public int FreeStalls { get; set; }
    public string Power { get; set; }
}