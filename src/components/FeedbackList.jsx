import "../styles/feedback.css";

const FeedbackList = ({ feedbacks }) => {
  return (
    <div className="feedback-list">
      <h3>Live Feedback</h3>
      {feedbacks.length === 0 ? (
        <p className="no-feedback">No feedback yet.</p>
      ) : (
        feedbacks.map((f, i) => <p key={i} className="feedback-item">{f.message}</p>)
      )}
    </div>
  );
};

export default FeedbackList;
