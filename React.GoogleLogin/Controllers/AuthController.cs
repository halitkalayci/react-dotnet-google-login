using Google.Apis.Auth;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace React.GoogleLogin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginRequest request)
        {
            var googleToken = request.IdToken;

            // Google token'ı doğrula
            GoogleJsonWebSignature.Payload payload = await ValidateGoogleToken(googleToken);

            if (payload == null)
            {
                return Unauthorized("Invalid Google token");
            }

            // Payload içerisinde baya bilgi var; email, resim, ad soyad vs..

            // Kullanıcıyı kontrol et, eğer yoksa oluştur

            // var user = await _userService.GetOrCreateUserByGoogleIdAsync(payload);

            // Artık kullanıcı db'mde de var kendi JWT token'imi oluşturabilirim.

            // var token = _jwtService.GenerateToken(user);

            return Ok(new { Payload = payload });
        }

        private async Task<GoogleJsonWebSignature.Payload> ValidateGoogleToken(string idToken)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings()
                {
                    // Siz configurationdan okuyun.
                    Audience = new List<string> { "client_id" }
                };

                var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);
                return payload;
            }
            catch (InvalidJwtException)
            {
                return null;
            }
        }

    }
    public class GoogleLoginRequest
    {
        public string IdToken { get; set; }
    }
}
