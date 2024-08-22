namespace EV.Charge.Models;

public class SightseeingPlace
{
    public string Id { get; set; }
    public string Name { get; set; }
    public string Address { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    public string? Website { get; set; }
    public string? Description { get; set; }
}