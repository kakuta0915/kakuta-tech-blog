// contactページ

import Meta from '@/src/components/meta/meta'
import Container from '@/src/components/container/container'
import Hero from '@/src/components/hero/hero'
import Form from '@/src/components/form/form'

export default function Contact() {
  return (
    <>
      <Container>
        <Meta
          pageTitle="CONTACT"
          pageDesc="お問い合わせはこちらからお願いいたします"
        />
        <Hero title="CONTACT" subtitle="お問い合わせ" imageOn />
      </Container>

      <Form>
        <form>
          <ul>
            <li>
              <label for="username">
                お名前
                <span>【必須】</span>
              </label>
              <input type="text" id="username" name="username" />
            </li>
            <li>
              <label for="company">会社名</label>
              <input type="text" id="company" name="company" />
            </li>
            <li>
              <label for="email">
                メールアドレス
                <span>【必須】</span>
              </label>
              <input type="email" id="email" name="email" />
            </li>
            <li>
              <label for="detail">
                お問い合わせ内容
                <span>【必須】</span>
              </label>
              <textarea id="detail" name="detail"></textarea>
            </li>
          </ul>
        </form>
        <button type="submit" value="送信">
          送信する
        </button>
      </Form>
    </>
  )
}
