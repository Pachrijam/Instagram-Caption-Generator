button = document.getElementById("dark-mode-btn");

button.addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
});


const portfolioFacts = InputDeviceInfo

const guideForm = document.querySelector("#guide-form");
const guideQuestion = document.querySelector("#guide-question");
const guideAnswer = document.querySelector("#guide-answer");


guideForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    guideAnswer.textContent = "Pondering...";

    const prompt = `
    You are a helpful guide for an instagram poster.
    
    Only answer using basic instagram caption tips:

    ${portfolioFacts}

    If the facts do not answer the question, say:
    "I do not have the information to answer your queries."

    Question: ${guideQuestion.value}
    ;
    `
    try {
        const response = await fetch(
        "https://generativelanguage.googleleapis.com/v1beta/models/gemini-3.5-flash:generateContent",
        {
            method: "POST",
            headers: {
                "Content-Type" : "applications/json",
                "x-goog-api-key" : GEMINI_API_KEY
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [
                            {text: prompt}
                        ]
                    }
                ]
            })
        }
    );
    
    const data = await response.json();

    if(!response.ok){
        throw new Error("Sorry twin. Gemini can't answer right now.");    
    }

    const answer = data.candidates?.[0]?.content?.parts?.[0]?.text;
    guideAnswer.textContent = 
    answer || "Gemini did not return an answer. Please try again.";
    } catch (error) {
        guideAnswer.textContent = error.message;
    }

})