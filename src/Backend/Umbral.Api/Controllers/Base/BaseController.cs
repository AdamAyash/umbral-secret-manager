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
    protected IActionResult ApiSuccessResponse<TData>(TData data) => Ok(BuildSuccessResponse(data));
    protected IActionResult ApiErrorResponse<TData>(BusinessResult<TData> businessResult) => BuildErrorResponse(businessResult);
    private int MapBusinessStatusToHttpStatus(ResultStatus status) => status switch
    {
        ResultStatus.Ok => 200,
        ResultStatus.ValidationFailure => 400,
        ResultStatus.NotFound => 404,
        ResultStatus.Unauthorized => 401,
        ResultStatus.Conflict => 409,
        ResultStatus.DatabaseFailure => 503,
        _ => 500
    };

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

    private IActionResult BuildErrorResponse<TData>(BusinessResult<TData> businessResult)
    {
        int statusCode = MapBusinessStatusToHttpStatus(businessResult.Status);
        var problemDetails = new ProblemDetails
        {
            Type = $"https://httpstatuses.com/{statusCode}",
            Title = GetProblemTitle(statusCode),
            Status = statusCode,
            Detail = businessResult.ErrorMessage,
            Instance = HttpContext.Request.Path.Value
        };

        if (!string.IsNullOrWhiteSpace(businessResult.ErrorCode))
            problemDetails.Extensions["errorCode"] = businessResult.ErrorCode;

        problemDetails.Extensions["traceId"] = HttpContext.TraceIdentifier;

        return StatusCode(statusCode, problemDetails);
    }

    private static string GetProblemTitle(int statusCode) => statusCode switch
    {
        StatusCodes.Status400BadRequest => "The request is invalid.",
        StatusCodes.Status401Unauthorized => "Authentication is required.",
        StatusCodes.Status404NotFound => "The requested resource was not found.",
        StatusCodes.Status409Conflict => "The request conflicts with the current state.",
        StatusCodes.Status503ServiceUnavailable => "The service is temporarily unavailable.",
        _ => "The request could not be completed."
    };
}
