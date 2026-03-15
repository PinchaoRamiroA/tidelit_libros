INSERT INTO book (id, title, author, published_year) VALUES
(1,'El Arte de Programar','Donald Knuth',1968),
(2,'Clean Code','Robert C. Martin',2008),
(3,'Refactoring','Martin Fowler',1999);

INSERT INTO review (book_id, rating, comment, created_at) VALUES
(1,5,'A masterpiece of computer science.', NOW()),
(1,4,'Very deep but worth reading.', NOW()),
(2,5,'Essential reading for developers.', NOW()),
(2,4,'Great principles and examples.', NOW()),
(3,5,'Refactoring explained perfectly.', NOW()),
(3,3,'Useful but a bit dated in some parts.', NOW());