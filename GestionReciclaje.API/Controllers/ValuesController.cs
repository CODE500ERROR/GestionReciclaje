using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.Controllers
{

    [Route("api/[controller]")]
    [ApiController]

    public class ValuesController : ControllerBase
    {
        //public readonly DataContext _context;
        public ValuesController()//DataContext context)
        {
           //_context=context;
        }

         public Guid GetIdUser()
       {
           var currentUser = Helper.HttpContext.Current.User.Claims;
           var result = Guid.Empty;
           foreach (var i in currentUser)
           {
               if (i.Type.Equals("nameid"))
               {
                   result = Guid.Parse(i.Value);
               }
           }

           return result;
       }

        // GET api/values
      
        public string Get()
        {            
            return GetIdUser().ToString();            
        }

     
    }
}
