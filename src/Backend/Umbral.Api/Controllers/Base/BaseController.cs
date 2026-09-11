using Microsoft.AspNetCore.Mvc;
using Umbral.Application.Common.BusinessResult;

namespace Umbral.Api.Controllers.Base;

[Route("api/[controller]")]
[ApiController]
public abstract class BaseController : ControllerBase
{
    protected BaseController() : base()
    { 
    }

    /// <summary>
    /// Creates API responses base on the result pattern.
    /// </summary>
    /// <typeparam name="ResponseData"></typeparam>
    /// <param name="responseData"></param>
    /// <returns></returns>
    protected IActionResult FromResult<T>(BusinessResult<T> result)
        => result.Status switch
        {
            ResultStatus.Ok => ApiOk(result.Data),
            ResultStatus.Unauthorized => ApiUnauthorized(result.ErrorMessage),
            ResultStatus.NotFound => ApiNotFound(result.ErrorMessage),
            ResultStatus.Conflict => ApiConflict(result.ErrorMessage),
            _ => throw new Exception("Unhandled result status")
        };

    /// <summary>
    /// Creates an HTTP 200 OK response containing a standardized success payload with the specified response data.
    /// </summary>
    /// <remarks>Use this method to return successful API responses in a consistent format. The response structure
    /// includes a success indicator and the provided data.</remarks>
    /// <typeparam name="ResponseData">The type of the data to include in the response body.</typeparam>
    /// <param name="responseData">The data to include in the success response payload. Can be null if no data is required.</param>
    /// <returns>An IActionResult representing a 200 OK response with a standardized success payload containing the specified data.</returns>
    protected IActionResult ApiOk<ResponseData>(ResponseData responseData) =>
      Ok(BuildSuccessResponse(responseData));


    /// <summary>
    /// Creates a new BaseServerResponse<T> instance containing the specified response data and success status.
    /// </summary>
    /// <typeparam name="ResponseData">The type of the response data to include in the server response.</typeparam>
    /// <param name="isSuccessful">A value indicating whether the operation was successful. Set to <see langword="true"/> if the operation succeeded;
    /// otherwise, <see langword="false"/>.</param>
    /// <param name="responseData">The response data to include in the server response. Can be null if no data is available.</param>
    /// <returns>A BaseServerResponse<T> object containing the provided response data and success status, with the timestamp set to
    /// the current UTC time.</returns>
    private BaseServerResponse<ResponseData> BuildSuccessResponse<ResponseData>(ResponseData responseData)
    {
        BaseServerResponse<ResponseData> baseServerResponse = new();
        baseServerResponse.DateTimeStamp = DateTime.UtcNow;
        baseServerResponse.IsSuccessful = true;
        baseServerResponse.Data = responseData;

        return baseServerResponse;
    }

    private ProblemDetailsModel BuildFailResponse()
    {
        var problemDetailsModel = new ProblemDetailsModel()
        {
            
        };

        return problemDetailsModel;
    }
}
