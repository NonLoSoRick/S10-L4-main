import { Button, ListGroup } from "react-bootstrap";

const SingleComment = ({ comment }) => {
	const deleteComment = async (asin) => {
		try {
			let response = await fetch("https://striveschool-api.herokuapp.com/api/comments/" + asin, {
				method: "DELETE",
				headers: {
					Authorization:
						"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTcxZDgwNzBkOGEyMDAwMThhNDhhNjIiLCJpYXQiOjE3MDQ5ODA4NjUsImV4cCI6MTcwNjE5MDQ2NX0.DETTxEOPFBzmvXc_kOkVhDkgzaPMdwqjSN3sbj34Sd4",
				},
			});
			if (response.ok) {
				alert("La recensione è stata elimata!");
			} else {
				throw new Error("La recensione non è stata eliminata!");
			}
		} catch (error) {
			alert(error);
		}
	};

	return (
		<ListGroup.Item data-testid="single-comment">
			{comment.comment}
			<Button variant="danger" className="ms-2" onClick={() => deleteComment(comment._id)}>
				Elimina
			</Button>
		</ListGroup.Item>
	);
};

export default SingleComment;
