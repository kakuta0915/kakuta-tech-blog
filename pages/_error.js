import React from 'react'

function Error({ statusCode }) {
  return (
    <div>
      <h1>エラーが発生しました</h1>
      {statusCode ? (
        <p>サーバーエラー: {statusCode}</p>
      ) : (
        <p>クライアントエラーが発生しました。</p>
      )}
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
