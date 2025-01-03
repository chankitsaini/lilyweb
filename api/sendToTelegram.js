export default async function handler(req, res) {
    if (req.method === 'POST') {
        const email = req.body.email;
        if (!email) {
            return res.status(400).json({ message: 'Email is required' });
        }

        const botToken = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;
        const message = `${email}`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ chat_id: chatId, text: message }),
            });

            const data = await response.json();
            if (!data.ok) throw new Error(data.description);

            return res.status(200).json({ message: 'Subscribed successfully' });
        } catch (error) {
            return res.status(500).json({ message: 'Error', error });
        }
    } else {
        return res.status(405).json({ message: 'Method not allowed' });
    }
}
