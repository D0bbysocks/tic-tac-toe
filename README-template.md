# Frontend Mentor - Tic Tac Toe

![Design preview for the Tic Tac Toe coding challenge](./preview.jpg)

## Welcome! 👋

This is my solution to the **Tic Tac Toe** premium challenge on [Frontend Mentor](https://www.frontendmentor.io).

This project pushed me quite a bit further than my previous ones — especially on the JavaScript side. I learned a lot about structuring game logic, managing UI state, and thinking more carefully about accessibility and interaction patterns.

It’s definitely a project where I can already see things I would architect differently next time — which is a great sign of progress.

---

## The challenge

The goal of this challenge was to build a fully interactive Tic Tac Toe game that matches the provided design as closely as possible.

The application includes:

- A start screen where Player 1 can choose their mark (X or O)
- The ability to play:
  - vs CPU
  - vs another player
- A dynamic game board with hover states
- Score tracking across rounds
- A restart modal
- Responsive layout for different screen sizes

### Bonus features implemented

- The computer does not just play randomly — basic logic was added to improve gameplay.
- Game state structure was built in a way that could easily be extended to persist state in localStorage.

---

## What I learned

This project was heavily focused on JavaScript architecture and interaction handling.

Some key concepts I practiced:

- Managing application state separately from the DOM
- Using `data-*` attributes to connect UI and logic
- Resetting and reinitializing game state cleanly
- Working with `classList`, `aria-*` attributes, and accessibility patterns
- Improving hover logic depending on active player
- Structuring event listeners in a maintainable way
- Thinking more carefully about semantic HTML and a11y (legend, aria-pressed, dialog roles, live regions)

One big takeaway:

If I were to start this project again, I would structure the game state and turn logic differently from the beginning. I now see better patterns for separating:

- Game logic
- UI updates
- State transitions

That’s a huge learning milestone for me.

---

## Built with

- Semantic HTML5
- CSS (custom properties, responsive layout, hover states)
- Vanilla JavaScript (no frameworks)
- Accessibility best practices (ARIA attributes, proper semantics)
- Mobile-first workflow

---

## Continued development

If I were to improve this project further, I would:

- Refactor the game logic into a more modular structure
- Improve CPU logic (minimax or smarter blocking system)
- Add persistent game state with `localStorage`
- Improve keyboard navigation on the board
- Potentially convert the board cells fully to button elements for stronger accessibility

---

## Useful resources

- MDN documentation for ARIA roles and attributes
- Frontend Mentor community discussions
- General best practices for state management in small JS apps

---

## Author

- Frontend Mentor – [Your Profile Link]
- GitHub – [Your GitHub Link]

---

## Acknowledgments

Thanks to Frontend Mentor for creating such a well-designed and challenging project.

This one really helped me level up my JavaScript thinking and overall frontend architecture. 🚀