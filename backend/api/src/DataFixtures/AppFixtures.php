<?php

namespace App\DataFixtures;

use App\Entity\Book;
use App\Entity\Review;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        /*
        BOOKS
        */

        $book1 = new Book();
        $book1->setTitle("El Arte de Programar");
        $book1->setAuthor("Donald Knuth");
        $book1->setPublishedYear(1968);

        $book2 = new Book();
        $book2->setTitle("Clean Code");
        $book2->setAuthor("Robert C. Martin");
        $book2->setPublishedYear(2008);

        $book3 = new Book();
        $book3->setTitle("Refactoring");
        $book3->setAuthor("Martin Fowler");
        $book3->setPublishedYear(1999);

        $manager->persist($book1);
        $manager->persist($book2);
        $manager->persist($book3);

        /*
        REVIEWS
        */

        $reviews = [

            [$book1, 5, "A masterpiece of computer science."],
            [$book1, 4, "Very deep but worth reading."],

            [$book2, 5, "Essential reading for developers."],
            [$book2, 4, "Great principles and examples."],

            [$book3, 5, "Refactoring explained perfectly."],
            [$book3, 3, "Useful but a bit dated in some parts."],

        ];

        foreach ($reviews as [$book, $rating, $comment]) {

            $review = new Review();
            $review->setBook($book);
            $review->setRating($rating);
            $review->setComment($comment);
            $review->setCreatedAt(new \DateTimeImmutable());

            $manager->persist($review);
        }

        $manager->flush();
    }
}