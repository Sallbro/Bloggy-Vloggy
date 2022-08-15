
export default function handler(req, res) {
    switch (req.method) {
        case 'GET':
            res.status(200).json("user get method");
            break;
        case 'POST':
            res.status(200).json("user post method");
            break;
        default:
            console.log("nothing...");

    }
}