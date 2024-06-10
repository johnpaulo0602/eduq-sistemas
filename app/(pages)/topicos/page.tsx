'use client';
import React, { Fragment, useEffect, useState } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import Swal from 'sweetalert2';
import IconListCheck from '@/components/icon/icon-list-check';
import IconSearch from '@/components/icon/icon-search';
import IconUserPlus from '@/components/icon/icon-user-plus';
import IconX from '@/components/icon/icon-x';

const TopicsPage = () => {
    const [addTopicModal, setAddTopicModal] = useState<any>(false);
    const [search, setSearch] = useState<any>('');
    const [value, setValue] = useState<any>('list');
    const [defaultParams] = useState({
        id: null,
        name: '',
        discipline: '',
    });

    const [params, setParams] = useState<any>(JSON.parse(JSON.stringify(defaultParams)));

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const [disciplineList] = useState<any>([
        { id: 1, name: 'Fundamentos da Computação' },
        { id: 2, name: 'Programação Orientada a Objetos' },
        { id: 3, name: 'Estruturas de Dados' },
        { id: 4, name: 'Banco de Dados' },
        { id: 5, name: 'Engenharia de Software' },
        { id: 6, name: 'Redes de Computadores' },
        { id: 7, name: 'Sistemas Operacionais' },
        { id: 8, name: 'Segurança da Informação' },
        { id: 9, name: 'Desenvolvimento Web' },
        { id: 10, name: 'Desenvolvimento Mobile' },
        { id: 11, name: 'Inteligência Artificial' },
        { id: 12, name: 'Gestão de Projetos de TI' },
        { id: 13, name: 'Arquitetura de Computadores' },
        { id: 14, name: 'Análise de Sistemas' },
        { id: 15, name: 'Empreendedorismo em TI' },
    ]);

    const [topicList, setTopicList] = useState<any>([
        { id: 1, name: 'Morfologia', discipline: 'Português' },
        { id: 2, name: 'Gramática', discipline: 'Português' },
        { id: 3, name: 'Sintaxe', discipline: 'Português' },
        { id: 4, name: 'Semântica', discipline: 'Português' },
    ]);

    const [filteredItems, setFilteredItems] = useState<any>(topicList);

    const searchTopic = () => {
        setFilteredItems(() => {
            return topicList.filter((item: any) => {
                return item.name.toLowerCase().includes(search.toLowerCase()) || item.discipline.toLowerCase().includes(search.toLowerCase());
            });
        });
    };

    useEffect(() => {
        searchTopic();
    }, [search]);

    const saveTopic = () => {
        if (!params.name || !params.discipline) {
            showMessage('Nome e Disciplina são obrigatórios.', 'error');
            return true;
        }

        if (params.id) {
            // update topic
            let topic: any = filteredItems.find((d: any) => d.id === params.id);
            topic.name = params.name;
            topic.discipline = params.discipline;
        } else {
            // add topic
            let maxTopicId = filteredItems.length ? filteredItems.reduce((max: any, item: any) => (item.id > max ? item.id : max), filteredItems[0].id) : 0;

            let topic = {
                id: maxTopicId + 1,
                name: params.name,
                discipline: params.discipline,
            };
            filteredItems.splice(0, 0, topic);
        }

        showMessage('Tópico salvo com sucesso.');
        setAddTopicModal(false);
    };

    const editTopic = (topic: any = null) => {
        const json = JSON.parse(JSON.stringify(defaultParams));
        setParams(json);
        if (topic) {
            let json1 = JSON.parse(JSON.stringify(topic));
            setParams(json1);
        }
        setAddTopicModal(true);
    };

    const deleteTopic = (topic: any = null) => {
        setFilteredItems(filteredItems.filter((d: any) => d.id !== topic.id));
        showMessage('Tópico deletado com sucesso.');
    };

    const showMessage = (msg = '', type = 'success') => {
        const toast: any = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            customClass: { container: 'toast' },
        });
        toast.fire({
            icon: type,
            title: msg,
            padding: '10px 20px',
        });
    };

    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <h2 className="text-xl">Tópicos</h2>
                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
                    <div className="flex gap-3">
                        <div>
                            <button type="button" className="btn btn-primary" onClick={() => editTopic()}>
                                <IconUserPlus className="ltr:mr-2 rtl:ml-2" />
                                Adicionar Tópico
                            </button>
                        </div>
                        {/* <div>
                            <button type="button" className={`btn btn-outline-primary p-2 ${value === 'list' && 'bg-primary text-white'}`} onClick={() => setValue('list')}>
                                <IconListCheck />
                            </button>
                        </div> */}
                    </div>
                    <div className="relative">
                        <input type="text" placeholder="Buscar Tópicos" className="peer form-input py-2 ltr:pr-11 rtl:pl-11" value={search} onChange={(e) => setSearch(e.target.value)} />
                        <button type="button" className="absolute top-1/2 -translate-y-1/2 peer-focus:text-primary ltr:right-[11px] rtl:left-[11px]">
                            <IconSearch className="mx-auto" />
                        </button>
                    </div>
                </div>
            </div>
            {value === 'list' && (
                <div className="panel mt-5 overflow-hidden border-0 p-0">
                    <div className="table-responsive">
                        <table className="table-striped table-hover">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome do Tópico</th>
                                    <th>Disciplina</th>
                                    <th className="!text-center">Ações</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredItems.map((topic: any) => {
                                    return (
                                        <tr key={topic.id}>
                                            <td>{topic.id}</td>
                                            <td>{topic.name}</td>
                                            <td>{topic.discipline}</td>
                                            <td>
                                                <div className="flex items-center justify-center gap-4">
                                                    <button type="button" className="btn btn-sm btn-outline-primary" onClick={() => editTopic(topic)}>
                                                        Editar
                                                    </button>
                                                    <button type="button" className="btn btn-sm btn-outline-danger" onClick={() => deleteTopic(topic)}>
                                                        Excluir
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            <Transition appear show={addTopicModal} as={Fragment}>
                <Dialog as="div" open={addTopicModal} onClose={() => setAddTopicModal(false)} className="relative z-50">
                    <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                        <div className="fixed inset-0 bg-[black]/60" />
                    </Transition.Child>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center px-4 py-8">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="panel w-full max-w-lg overflow-hidden rounded-lg border-0 p-0 text-black dark:text-white-dark">
                                    <button
                                        type="button"
                                        onClick={() => setAddTopicModal(false)}
                                        className="absolute top-4 text-gray-400 outline-none hover:text-gray-800 ltr:right-4 rtl:left-4 dark:hover:text-gray-600"
                                    >
                                        <IconX />
                                    </button>
                                    <div className="bg-[#fbfbfb] py-3 text-lg font-medium ltr:pl-5 ltr:pr-[50px] rtl:pl-[50px] rtl:pr-5 dark:bg-[#121c2c]">
                                        {params.id ? 'Editar Tópico' : 'Adicionar Tópico'}
                                    </div>
                                    <div className="p-5">
                                        <form>
                                            <div className="mb-5">
                                                <label htmlFor="name">Nome</label>
                                                <input id="name" type="text" placeholder="Digite o nome do tópico" className="form-input" value={params.name} onChange={(e) => changeValue(e)} />
                                            </div>
                                            <div className="mb-5">
                                                <label htmlFor="discipline">Disciplina</label>
                                                <select id="discipline" className="form-select" value={params.discipline} onChange={(e) => changeValue(e)}>
                                                    <option value="" disabled>
                                                        Selecione uma disciplina
                                                    </option>
                                                    {disciplineList.map((discipline: any) => (
                                                        <option key={discipline.id} value={discipline.name}>
                                                            {discipline.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="mt-8 flex items-center justify-end">
                                                <button type="button" className="btn btn-outline-danger" onClick={() => setAddTopicModal(false)}>
                                                    Cancelar
                                                </button>
                                                <button type="button" className="btn btn-primary ltr:ml-4 rtl:mr-4" onClick={saveTopic}>
                                                    {params.id ? 'Atualizar' : 'Adicionar'}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default TopicsPage;
