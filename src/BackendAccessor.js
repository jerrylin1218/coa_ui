export function getData(endpoint)
{
    const url = process.env.NODE_ENV === "development" ? 
        "http://localhost:5000" : "http://coa-flask-app-dev.us-east-1.elasticbeanstalk.com";

    console.log(`getData url=${url}/${endpoint}`);
    
    return fetch(`${url}/${endpoint}`,
                {"method": "GET", "mode": "cors"});
}