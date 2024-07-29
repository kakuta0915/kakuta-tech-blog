// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  const { name, email, message } = req.body
  console.log({ name, email, message })

  res.status(200).json({ message: '成功' })
}
