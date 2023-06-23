const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    organization: process.env.ORG,
    apiKey: process.env.OPENAI_API_KEY
})
const openai = new OpenAIApi(configuration);

exports.getPage = async (req, res) => {
    res.render("index");
}

exports.getResponse = async (req, res) => {
    const data = req.body.data;
    // console.log(data);
    try {
        const completion = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: data,
            max_tokens: 3000,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        var response = completion.data.choices[0].text;
        response = response.replace(/^\s+|\s+$/g, '');

        res.status(200).send(response);
    }
    catch (e) {
        console.log("Error has occurred: " + e.message);
        console.log(e)
    }
}
