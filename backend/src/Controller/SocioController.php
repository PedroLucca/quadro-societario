<?php

namespace App\Controller;

use App\Entity\Socio;
use App\Entity\Empresa;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/socios')]
class SocioController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function listarSocios(EntityManagerInterface $em): JsonResponse
    {
        $socios = $em->getRepository(Socio::class)->findAll();
        return $this->json($socios);
    }

    #[Route('', methods: ['POST'])]
    public function criarSocio(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $dados = json_decode($request->getContent(), true);
        $empresa = $em->getRepository(Empresa::class)->find($dados['empresa_id']);

        if (!$empresa) {
            return $this->json(['error' => 'Empresa não encontrada'], 404);
        }

        $socio = new Socio();
        $socio->setNome($dados['nome']);
        $socio->setCpf($dados['cpf']);
        $socio->setEmpresa($empresa);

        $em->persist($socio);
        $em->flush();

        return $this->json($socio, 201);
    }
}
