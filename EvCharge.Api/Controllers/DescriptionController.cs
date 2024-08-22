using System.ClientModel;
using Azure;
using Azure.AI.OpenAI;
using EvCharge.Api.Data;
using Microsoft.AspNetCore.Mvc;

namespace EvCharge.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DescriptionController : ControllerBase
{
    private readonly PlacesRepository _placesRepository;
    private readonly string _openAiApiKey;
    public DescriptionController(IConfiguration configuration, PlacesRepository placesRepository)
    {
        _placesRepository = placesRepository;
        _openAiApiKey = configuration.GetValue<string>("OpenAiApiKey");
    }
    [HttpPost]
    public async Task<IActionResult> GenerateDescription([FromBody] string[] placesIds)
    {
        if (placesIds == null || placesIds.Length == 0)
        {
            return BadRequest("No places provided");
        }

        var placeIdHash = placesIds.ToHashSet();
        var completionOptions = new ChatCompletionsOptions
        {
            MaxTokens = 400,
            Temperature = 1f,
            FrequencyPenalty = 0.0f,
            PresencePenalty = 0.0f,
            DeploymentName = "HackIfGpt4"
        };
        var openAiClient = new OpenAIClient(new Uri("https://hackif-2024-ev-charge.openai.azure.com"), new AzureKeyCredential(_openAiApiKey));
        completionOptions.Messages.Add(new ChatRequestSystemMessage("You are a system that creates interesting and witty travel descriptions. I am organizing a travel route through several sightseeing objects in Latvia. your task is to create a short travel description (a few sentences per site) for a list of given sightseeing sites (in the order as they are given)."));


        var allPlaces = (await _placesRepository.GetAllPlacesAsync())
            .Where(place => placeIdHash.Contains(place.Id))
            .Select(place => $"{place.Name} ({place.Address})")
            .ToList();

        var placesString = string.Join("\n", allPlaces);

        completionOptions.Messages.Add(new ChatRequestUserMessage(placesString));
        var response = await openAiClient.GetChatCompletionsAsync(completionOptions);

        return Ok(response.Value.Choices.First().Message.Content);

        //var systemMesage = new ChatRequestMessage(ChatRole.System, "You are a system that creates interesting and witty travel descriptions. I am organizing a travel route through several sightseeing objects in Latvia. your task is to create a short travel description (a few sentences per site) for a list of given sightseeing sites (in the order as they are given). Each site contains an address in braces, but it is only for you to help you to identify the actual place");
        //var userMessage = ChatMessage.CreateSystemMessage("Freedom monument (Brīvības bulvāris, Centra rajons, Rīga, LV-1050, Latvia)\nKoknese Castle Ruins (Koknese, LV-5113, Latvia)\nPāvilosta Seaside Park (Pāvilosta, LV-3466, Latvia)");

        //var result = await chatClient.CompleteChatAsync(new []{systemMesage, userMessage}, completionOptions);

        //if (result == null || result.Value == null)
        //{
        //    return BadRequest("Failed to generate description");
        //}

        //return Ok(result.Value.ToString());
    }
}