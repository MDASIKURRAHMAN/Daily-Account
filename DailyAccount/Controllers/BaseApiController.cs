using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DailyAccount.Controllers
{
    [Route("api/[controller]")]
    [ApiController, Authorize]
    [Produces("application/json")]
    public class BaseApiController : ControllerBase
    {
    }
}
