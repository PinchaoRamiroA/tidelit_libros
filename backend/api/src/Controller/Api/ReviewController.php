<?php

namespace App\Controller\Api;

use App\Entity\Review;
use App\Repository\BookRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class ReviewController extends AbstractController
{
    #[Route('/api/reviews', name: 'api_create_review', methods: ['POST'])]
    public function create(
        Request $request,
        BookRepository $bookRepository,
        EntityManagerInterface $em,
        ValidatorInterface $validator
    ): JsonResponse {

        $data = json_decode($request->getContent(), true);

        if (!$data) {
            return $this->json([
                'error' => 'Invalid JSON body'
            ], 400);
        }

        $bookId = $data['book_id'] ?? null;
        $rating = $data['rating'] ?? null;
        $comment = $data['comment'] ?? null;

        /*
        VALIDACIONES BÁSICAS
        */

        if (!$bookId) {
            return $this->json(['error' => 'book_id is required'], 400);
        }

        if (!$rating) {
            return $this->json(['error' => 'rating is required'], 400);
        }

        if (!$comment) {
            return $this->json(['error' => 'comment cannot be empty'], 400);
        }

        if (!is_int($rating) || $rating < 1 || $rating > 5) {
            return $this->json([
                'error' => 'rating must be an integer between 1 and 5'
            ], 400);
        }

        /*
        VALIDAR QUE EL BOOK EXISTE
        */

        $book = $bookRepository->find($bookId);

        if (!$book) {
            return $this->json([
                'error' => 'Book not found'
            ], 400);
        }

        /*
        CREAR REVIEW
        */

        $review = new Review();
        $review->setBook($book);
        $review->setRating($rating);
        $review->setComment($comment);
        $review->setCreatedAt(new \DateTimeImmutable());

        /*
        VALIDAR ENTIDAD (Symfony Validator)
        */

        $errors = $validator->validate($review);

        if (count($errors) > 0) {

            $validationErrors = [];

            foreach ($errors as $error) {
                $validationErrors[] = [
                    'field' => $error->getPropertyPath(),
                    'message' => $error->getMessage()
                ];
            }

            return $this->json([
                'errors' => $validationErrors
            ], 400);
        }

        /*
        GUARDAR
        */

        $em->persist($review);
        $em->flush();

        /*
        RESPUESTA
        */

        return $this->json([
            'id' => $review->getId(),
            'created_at' => $review->getCreatedAt()->format('Y-m-d H:i:s')
        ], 201);
    }
}