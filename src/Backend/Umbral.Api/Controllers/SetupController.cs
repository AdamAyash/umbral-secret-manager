using Microsoft.AspNetCore.Mvc;
using Umbral.Api.Contracts.Setup;
using Umbral.Api.Controllers.Base;
using Umbral.Application.Features.Setup.Services;

namespace Umbral.Api.Controllers
{
    public class SetupController : BaseController
    {
        [HttpGet("require-initial-setup")]
        public async Task<IActionResult> RequiresInitialSetup()
        {
            SetupStatusService setupStatusService = new SetupStatusService();
            var result = await setupStatusService.RequiresInitialSetupAsync(CancellationToken.None);

            var temp = new GetSetupStatusResponse() { RequiresInitialSetup = result.Data };

            return ApiOk(temp);
        }
    }
}
