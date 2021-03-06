// Delete :+1: comments
const singleEmoji = /^\W*(:[\w-+]+:|[\uE000-\uF8FF]|\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDDFF])\W*$/g
on('issue_comment.created')
  .filter(context => context.payload.comment.body.match(singleEmoji))
  .deleteComment()

// Restore deleted comments but the one deleted by Probot
on('issue_comment', 'commit_comment', 'pull_request_review_comment')
  .filter(context => context.payload.action === 'deleted' && context.isBot)
  .comment(`
Deleted comment from @{{ comment.user.login }} at {{ comment.updated_at }}

---
{{ comment.body }}
`)
