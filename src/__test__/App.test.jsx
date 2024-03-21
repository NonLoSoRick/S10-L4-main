import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";

describe("tests", () => {
	it("Welcome is mounting correctly", () => {
		render(<App />);

		const exists = screen.getByText("Benvenuti in EpiBooks!");

		expect(exists).toBeInTheDocument();
	});

	it("Are bootstrap cards as numerous as books", () => {
		render(<App />);

		const bookCard = screen.getAllByTestId("book-card");

		expect(bookCard).toHaveLength(150);
	});

	it("Render Comment Area correctly", () => {
		render(<App />);

		const inputField = screen.getByPlaceholderText(/inserisci qui il testo/i);

		expect(inputField).toBeInTheDocument();
	});

	it("Book filter correctly", () => {
		render(<App />);

		const inputField = screen.getByPlaceholderText(/cerca un libro/i);

		fireEvent.change(inputField, { target: { value: "witcher" } });

		const card = screen.getAllByTestId("book-card");

		expect(card).toHaveLength(3);
	});

	it("book filter try 2", () => {
		render(<App />);

		const inputField = screen.getByPlaceholderText(/cerca un libro/i);

		fireEvent.change(inputField, { target: { value: "warcraft" } });

		const card = screen.getAllByTestId("book-card");

		expect(card).toHaveLength(1);
	});

	it("change card border color", () => {
		render(<App />);

		const cards = screen.getAllByTestId("book-card");

		const singleCard = cards[0];

		fireEvent.click(singleCard);

		expect(singleCard).toHaveStyle("border: 3px solid red");
	});

	it("border card color back to none", () => {
		render(<App />);

		const cards = screen.getAllByTestId("book-card");

		const singleCard1 = cards[0];

		const singleCard2 = cards[1];

		fireEvent.click(singleCard1);

		expect(singleCard1).toHaveStyle("border: 3px solid red");

		fireEvent.click(singleCard2);

		expect(singleCard1).not.toHaveStyle("border: 3px solid red");
	});

	it("singlecomment not render on load", () => {
		render(<App />);

		const button = screen.queryByPlaceholderText(/elimina/i);

		expect(button).not.toBeInTheDocument();
	});

	it("singlecomment render after clicked on a book", async () => {
		render(<App />);

		const books = screen.getAllByTestId("book-card");

		const singleBook = books[0];

		fireEvent.click(singleBook);

		const comments = await screen.findAllByTestId("single-comment");

		expect(comments).not.toHaveLength(0);
	});
});
