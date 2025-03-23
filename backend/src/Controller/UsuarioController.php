<?php

namespace App\Controller;

use App\Entity\Usuario;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

#[Route('/api/usuarios')]
class UsuarioController extends AbstractController
{
    public function __construct(private EntityManagerInterface $em) {}

    #[Route('/registrar', methods: ['POST'])]
    public function registrar(Request $request, UserPasswordHasherInterface $passwordHasher): JsonResponse
    {
        $dados = json_decode($request->getContent(), true);

        if (empty($dados['nome']) || empty($dados['email']) || empty($dados['senha'])) {
            return $this->json(['erro' => 'Dados incompletos.'], 400);
        }

        $usuario = new Usuario();
        $usuario->setNome($dados['nome']);
        $usuario->setEmail($dados['email']);
        //dd($usuario);
        $usuario->setSenha($passwordHasher->hashPassword($usuario, $dados['senha']));

        $this->em->persist($usuario);
        $this->em->flush();

        return $this->json(['mensagem' => 'Usuário registrado com sucesso.'], 201);
    }

    #[Route('/login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $dados = json_decode($request->getContent(), true);
        $usuario = $this->em->getRepository(Usuario::class)->findOneBy(['email' => $dados['email']]);

        if (!$usuario || !password_verify($dados['senha'], $usuario->getSenha())) {
            return $this->json(['erro' => 'Credenciais inválidas.'], 401);
        }

        $token = bin2hex(random_bytes(16));
        $expiracao = new \DateTimeImmutable('+30 minutes'); // Já é \DateTimeImmutable

        $usuario->setToken($token);
        $usuario->setTokenExpiracao($expiracao); // Passa o \DateTimeImmutable diretamente

        $this->em->flush();

        return $this->json([
            'token' => $token,
            'expira_em' => $expiracao->format('Y-m-d H:i:s')
        ]);
    }

    #[Route('/logout', methods: ['POST'])]
    public function logout(Request $request): JsonResponse
    {
        $token = $request->headers->get('Authorization');

        $usuario = $this->em->getRepository(Usuario::class)->findOneBy(['token' => $token]);

        if (!$usuario) {
            return $this->json(['erro' => 'Token inválido.'], 401);
        }

        $usuario->setToken(null);
        $usuario->setTokenExpiracao(null); // Define como null

        $this->em->flush();

        return $this->json(['mensagem' => 'Logout realizado com sucesso.']);
    }
}
