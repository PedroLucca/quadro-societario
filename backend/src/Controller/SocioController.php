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
        $lista = array_map(function(Socio $socio) {
            return $socio->toArray();
        }, $socios);
        return $this->json($lista);
    }

    #[Route('/total', methods: ['GET'])]
    public function totalSocios(EntityManagerInterface $em): JsonResponse
    {
        $total = $em->getRepository(Socio::class)->count([]);
        
        return $this->json(['total' => $total]);
    }

    #[Route('', methods: ['POST'])]
    public function criarSocio(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $dados = json_decode($request->getContent(), true); 


        if (!isset($dados['nome']) || !isset($dados['cpf']) || !isset($dados['empresa_ids'])) {
            return $this->json(['error' => 'Dados incompletos. É necessário fornecer nome, cpf e empresa_ids.'], 400);
        }


        $socio = new Socio();
        $socio->setNome($dados['nome']);
        $socio->setCpf($dados['cpf']);

        foreach ($dados['empresa_ids'] as $empresaId) {
            $empresa = $em->getRepository(Empresa::class)->find($empresaId);
            if (!$empresa) {
                return $this->json(['error' => "Empresa com ID $empresaId não encontrada."], 404);
            }
            $socio->addEmpresa($empresa);
        }

        $em->persist($socio);
        $em->flush();

        return $this->json($socio->toArray(), 201);
    }


    #[Route('/{id}', methods: ['PUT'])]
    public function editarSocio(int $id, Request $request, EntityManagerInterface $em): JsonResponse
    {
        $socio = $em->getRepository(Socio::class)->find($id);

        if (!$socio) {
            return $this->json(['erro' => 'Sócio não encontrado.'], 404);
        }

        $dados = json_decode($request->getContent(), true);

        if (isset($dados['nome'])) {
            $socio->setNome($dados['nome']);
        }
        if (isset($dados['cpf'])) {
            $socio->setCpf($dados['cpf']);
        }
        if (isset($dados['empresa_ids'])) {
     
            foreach ($socio->getEmpresas() as $empresa) {
                $socio->removeEmpresa($empresa);
            }

  
            foreach ($dados['empresa_ids'] as $empresaId) {
                $empresa = $em->getRepository(Empresa::class)->find($empresaId);
                if (!$empresa) {
                    return $this->json(['error' => "Empresa com ID $empresaId não encontrada."], 404);
                }
                $socio->addEmpresa($empresa);
            }
        }

        $em->flush();

        return $this->json($socio->toArray());
    }

    #[Route('/{id}', methods: ['DELETE'])]
    public function deletarSocio(int $id, EntityManagerInterface $em): JsonResponse
    {
        $socio = $em->getRepository(Socio::class)->find($id);

        if (!$socio) {
            return $this->json(['erro' => 'Sócio não encontrado.'], 404);
        }

        $em->remove($socio);
        $em->flush();

        return $this->json(['mensagem' => 'Sócio deletado com sucesso.']);
    }
}