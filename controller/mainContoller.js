const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration);

exports.getPage = (req, res) => {
    res.render("index");
}
const reply = async (data) => {
    const completion = await openai.createCompletion({
        model: "gpt-3.5-turbo-instruct",
        prompt: data,
        max_tokens: 3000,
    })
    // console.log(completion)
    return completion;
}
exports.getResponse = async (req, res) => {
    const data = req.body.data;
    // console.log(data);
    const resp = await reply(data);
    var response = resp.data.choices[0].text;
    response = response.replace(/^\s+|\s+$/g, '');
    res.status(200).send(response);
    // if (resp.data.error) {
    //     res.status(200).send("Error Occured! ", resp.data.eror.message);
    // } else {
    // }
}
