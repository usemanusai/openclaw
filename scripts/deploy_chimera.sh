#!/bin/bash
# Project Chimera: Qwen 3.5 CPU Optimization Deployment Script
# Optimized for Intel Core i9-9900K (8 Cores, 16 Threads) - 128GB DDR4 RAM

CONTAINER_NAME="chimera-ollama"

echo "=== Project Chimera: Phase 1 Bedrock Initialization ==="

# 1. Cleanup existing legacy containers
echo "Cleaning up existing containers..."
docker stop $CONTAINER_NAME 2>/dev/null || true
docker rm $CONTAINER_NAME 2>/dev/null || true

# 2. Initialize Ollama with 100% CPU Optimization parameters
# - OLLAMA_NUM_THREADS=8: Strictly pin to physical cores to avoid SMT cache thrashing.
# - OLLAMA_MLOCK=1: Lock models in RAM to bypass swap and page faulting.
# - OLLAMA_NUM_PARALLEL=2: Gate concurrency to maximize AVX2 register efficiency.
# - OLLAMA_KEEP_ALIVE=-1: Prevent model unloading to ensure immediate availability.
# - OLLAMA_FLASH_ATTENTION=1: Optimize context window memory footprint.
# - --cap-add=IPC_LOCK: Required for mlock to function inside Docker.

echo "Starting optimized Ollama engine..."
docker run -d \
  --name $CONTAINER_NAME \
  -p 11434:11434 \
  -v chimera_ollama_data:/root/.ollama \
  -e OLLAMA_NUM_THREADS=8 \
  -e OLLAMA_MLOCK=1 \
  -e OLLAMA_NUM_PARALLEL=2 \
  -e OLLAMA_KEEP_ALIVE=-1 \
  -e OLLAMA_MAX_LOADED_MODELS=3 \
  -e OLLAMA_FLASH_ATTENTION=1 \
  --cap-add=IPC_LOCK \
  ollama/ollama:latest

echo "Waiting for engine initialization (5s)..."
sleep 5

# 3. Pull validated Qwen 3.5 GGUF models from Unsloth/Hugging Face
echo "Pulling Qwen 3.5 0.8B (Routing - Q8_0)..."
docker exec -it $CONTAINER_NAME ollama pull hf.co/unsloth/Qwen3.5-0.8B-GGUF:Q8_0

echo "Pulling Qwen 3.5 4B (Workhorse - Q4_K_M)..."
docker exec -it $CONTAINER_NAME ollama pull hf.co/unsloth/Qwen3.5-4B-GGUF:Q4_K_M

echo "Pulling Qwen 3.5 9B (Critic - Q6_K)..."
docker exec -it $CONTAINER_NAME ollama pull hf.co/unsloth/Qwen3.5-9B-GGUF:Q6_K

echo "=== Project Chimera: Qwen 3.5 CPU Enclave Successfully Initialized ==="
docker exec $CONTAINER_NAME ollama list
