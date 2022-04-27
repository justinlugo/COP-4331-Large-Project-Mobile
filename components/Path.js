const app_name = 'letsdothings'
exports.buildPath = 
function buildPath(route)
{
    return 'https://' + app_name +  '.herokuapp.com/' + route;   
}
