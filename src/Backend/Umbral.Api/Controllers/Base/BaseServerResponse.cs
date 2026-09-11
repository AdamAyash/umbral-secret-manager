namespace Umbral.Api.Controllers.Base;

public sealed class BaseServerResponse<ResponseData>
{
    /// <summary>
    /// Gets or sets the date and time associated with this instance.
    /// </summary>
    public DateTime DateTimeStamp { get; set; }

    /// <summary>
    /// Gets or sets a value indicating whether the operation completed successfully.
    /// </summary>
    public bool IsSuccessful { get; set; }

    /// <summary>
    /// Gets or sets the response data associated with the result.
    /// </summary>
    public ResponseData? Data { get; set; }

    public BaseServerResponse()
    {
        this.DateTimeStamp = DateTime.Now;
        this.IsSuccessful = false;
    }
}
