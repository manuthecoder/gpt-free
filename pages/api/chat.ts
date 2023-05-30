export default async function handler(req: any, res: any) {
  const { prompt } = JSON.parse(req.body);

  const body = {
    debug: false,
    locale: "en",
    messages: [
      {
        author: "user",
        content: {
          text: prompt,
        },
      },
    ],
  };

  const result = await fetch("https://chat.gptfree.top/ai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "GPT-Free-Auth": "demo-v1",
    },
    body: JSON.stringify(body),
  }).then((res) => res.text());

  res.write(
    result
      .trim()
      .split("\n\n")
      .map((line) => JSON.parse(line.trim().substring(6)).text)
      .join("")
  );

  res.end();
}
