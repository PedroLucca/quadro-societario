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

        $lista = array_map(function(Empresa $empresa) {
            return $empresa->toArray();
        }, $empresas);

        return $this->json($lista);
    }

    #[Route('/total', methods: ['GET'])]
    public function totalEmpresas(EntityManagerInterface $em): JsonResponse
    {
        $total = $em->getRepository(Empresa::class)->count([]);

        return $this->json(['total' => $total]);
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

    #[Route('/{id}', methods: ['PUT'])]
    public function editarEmpresa(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $empresa = $em->getRepository(Empresa::class)->find($id);

        if (!$empresa) {
            return $this->json(['erro' => 'Empresa não encontrada.'], 404);
        }

        $dados = json_decode($request->getContent(), true);
        $empresa->setNome($dados['nome'] ?? $empresa->getNome());
        $empresa->setCnpj($dados['cnpj'] ?? $empresa->getCnpj());
        $empresa->setEndereco($dados['endereco'] ?? $empresa->getEndereco());

        $em->flush();

        return $this->json($empresa->toArray());
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function deletarEmpresa(int $id, EntityManagerInterface $em): JsonResponse
    {
        $empresa = $em->getRepository(Empresa::class)->find($id);

        if (!$empresa) {
            return $this->json(['erro' => 'Empresa não encontrada.'], 404);
        }

        $em->remove($empresa);
        $em->flush();

        return $this->json(['mensagem' => 'Empresa deletada com sucesso.']);
    }
}
