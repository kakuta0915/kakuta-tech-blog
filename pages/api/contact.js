// eslint-disable-next-line import/no-anonymous-default-export
import nodemailer from 'nodemailer'

const contactHandler = async (req, res) => {
  // リクエストボディのログ出力
  console.log(req.body)

  const { name, company, email, message } = req.body

  // 必要なフィールドが存在するかを確認
  if (!name || !email || !message) {
    return res
      .status(400)
      .json({ message: '必要なフィールドが不足しています。' })
  }

  // nodemailerの設定
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: 'お問い合わせフォームの送信',
    text: `名前: ${name}\n会社名: ${
      company || '未記入'
    }\nメール: ${email}\nメッセージ: ${message}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({ message: '成功' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'メール送信エラー' })
  }
}

export default contactHandler
