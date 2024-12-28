var markdown = require("markdown").markdown;
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.getPage = (req, res) => {
    res.render("index");
}

const reply = async (data) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const result = await model.generateContent(data);
        const textToUtter = result.response.text();
        let textGenerated = markdown.toHTML(textToUtter);
        textGenerated = textGenerated.replace(/^<p>|<\/p>$/g, "");
        return { textGenerated, textToUtter };
    } catch (error) {
        console.log("error ❌❌ ", error);
    }
}
exports.getResponse = async (req, res) => {
    try {
        const data = req.body.data;
        const { textGenerated, textToUtter } = await reply(data);
        res.status(200).json({ textGenerated, textToUtter });
    } catch (error) {
        console.log("error ❌ ", error);
    }
}
