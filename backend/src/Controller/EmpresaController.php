<?php

namespace App\Controller;

use App\Entity\Empresa;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

#[Route('/api/empresas')]
class EmpresaController extends AbstractController
{
    #[Route('', methods: ['GET'])]
    public function listarEmpresas(EntityManagerInterface $em): JsonResponse
    {
        $empresas = $em->getRepository(Empresa::class)->findAll();
        return $this->json($empresas);
    }

    #[Route('', methods: ['POST'])]
    public function criarEmpresa(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $dados = json_decode($request->getContent(), true);
        $empresa = new Empresa();
        $empresa->setNome($dados['nome']);
        $empresa->setCnpj($dados['cnpj']);
        $empresa->setEndereco($dados['endereco']);

        $em->persist($empresa);
        $em->flush();

        return $this->json($empresa, 201);
    }
}
