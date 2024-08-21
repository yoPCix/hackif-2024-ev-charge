using FluentAssertions;
using GMap.NET;

namespace EvCharge.Api.Controllers.Tests
{
    [TestClass]
    public class GooglePolylineConverterTests
    {
        [TestMethod]
        public void DecodeTest()
        {
            var polyline = "q~l~Hxmf_O";
            var decoded = GooglePolylineConverter.Decode(polyline); 
            decoded.Should().BeEquivalentTo(new List<PointLatLng>
            {
                new PointLatLng ( 52.33657, -83.92429 ),
                
            });
        }

        [TestMethod()]
        public void EncodeTest()
        {
            var points = new List<PointLatLng>
            {
                new PointLatLng(52.33657, -83.92429),
            };
            var encoded = GooglePolylineConverter.Encode(points);
            encoded.Should().Be("q~l~Hxmf_O");
        }

        [TestMethod()]
        public void EncodeTest_FreedomMonument()
        {
            var points = new List<PointLatLng>
            {
                new PointLatLng(56.955791, 24.106283),
                new PointLatLng(56.955742, 24.106274),
            };
            var encoded = GooglePolylineConverter.Encode(points);
            encoded.Should().Be("udszIggcrCH@");

            var dist = PlacesController.DistanceTo(points, points[0]);
        }
    }
}