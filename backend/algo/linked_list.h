#pragma once
#include <stdexcept>


template <class T>
class LinkedList {
    public:
        LinkedList() {
            head_->next = tail_;
            tail_->prev = head_;
        }

        void push(T data) {
            auto new_node = new Node(data);
            std::swap(tail_->data, new_node->data);
            tail_->next = new_node;
            new_node->prev = tail_;
            tail_ = new_node;
            ++size_;
        }

        size_t size() const {
            return size_;
        }

        bool empty() const {
            return size() == 0;
        }

        T& operator[](size_t index) const {
            auto currentNode = head_->next;

            if (index >= size_) {
                throw std::out_of_range("List index out of range");
            }
            
            while (index --> 0) {
                currentNode = currentNode->next;
            }
            return *(currentNode->data);
        }

        void sort() {
            auto check = [&](){
                for (int i = 0; i < size() - 1; ++i) {
                    if (std::less<T>{}(operator[](i + 1), operator[](i))) {
                        return false;
                    }
                }
                return true;
            };

            while (!check()) {
                for (int i = 0; i < size() - 1; ++i) {
                    if (std::less<T>{}(operator[](i + 1), operator[](i))) {
                        std::swap(operator[](i), operator[](i + 1));
                    }
                }
            }
        }

        void free() {
            while (size() != 0) {
                erase_(head_->next);
            }
        }

        void pop(size_t index) {
            if (index >= size()) {
                throw std::out_of_range("List index out of range");
            }

            auto currentNode = head_->next;
            while (index --> 0) {
                currentNode = currentNode->next;
            }
            erase_(currentNode);
        }

        ~LinkedList() {
            // free();
        }

    private:
        struct Node {
            T* data = nullptr;
            Node* prev = nullptr;
            Node* next = nullptr;

            Node() = default;

            Node(
                T data
            ) {
                this->data = new T(data);
            }

            ~Node() {
                if (data) {
                    delete data;
                }
            }
        };
        
        void erase_(Node* target) {
            target->prev->next = target->next;
            target->next->prev = target->prev;
            --size_;
            delete target;
        }

        Node* head_ = new Node();
        Node* tail_ = new Node();
        size_t size_ = 0;
};
