<?php

namespace App\Controller\Api;

use App\Repository\BookRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

final class BookController extends AbstractController
{
    #[Route('/api/books', name: 'api_books_list', methods: ['GET'])]
    public function list(BookRepository $bookRepository): JsonResponse
    {
        $books = $bookRepository->findAllWithAverageRating();

        $data = array_map(function ($book) {
            return [
                'id' => (int) $book['id'],
                'title' => $book['title'],
                'author' => $book['author'],
                'published_year' => (int) $book['publishedYear'],
                'average_rating' => $book['average_rating'] !== null 
                    ? round((float)$book['average_rating'], 2) 
                    : null
            ];
        }, $books);

        return $this->json($data);
    }
}