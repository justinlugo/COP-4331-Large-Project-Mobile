const app_name = 'letsdothings'
exports.buildPath = 
function buildPath(route)
{
    return 'https://' + app_name +  '.herokuapp.com/' + route;
    
    if (process.env.NODE_ENV === 'production') 
    {
        return 'https://' + app_name +  '.herokuapp.com/' + route;
    }
    else
    {        
        return 'http://localhost:5000/' + route;
    }
    
}
