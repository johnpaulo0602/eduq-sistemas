'use client';
import IconSave from '@/components/icon/icon-save';
import IconSend from '@/components/icon/icon-send';
import IconX from '@/components/icon/icon-x';
import Link from 'next/link';
import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AdicionarEditarQuestao = () => {
    const [items, setItems] = useState<any>([
        {
            id: 1,
            alternative: '',
            correct: false,
        },
    ]);

    const [params, setParams] = useState<any>({
        title: '',
        body: '',
        questionType: '',
        level: '',
        discipline: '',
        topic: '',
        owner: '',
    });

    const addItem = () => {
        let maxId = 0;
        maxId = items?.length ? items.reduce((max: number, character: any) => (character.id > max ? character.id : max), items[0].id) : 0;

        setItems([
            ...items,
            {
                id: maxId + 1,
                alternative: '',
                correct: false,
            },
        ]);
    };

    const removeItem = (item: any = null) => {
        setItems(items.filter((d: any) => d.id !== item.id));
    };

    const changeValue = (e: any) => {
        const { value, id } = e.target;
        setParams({ ...params, [id]: value });
    };

    const toggleCorrect = (id: number) => {
        const updatedItems = items.map((item: any) => {
            if (item.id === id) {
                return { ...item, correct: !item.correct };
            }
            return item;
        });
        setItems(updatedItems);
    };

    const saveQuestion = () => {
        // Lógica para salvar a questão
        console.log('Questão salva:', params, items);
    };

    return (
        <div className="flex flex-col gap-2.5">
            <div className="panel flex-1 px-0 py-6">
                <div className="flex flex-wrap justify-between px-4">
                    <div className="mb-6 w-full">
                        <div className="text-lg font-medium text-black dark:text-white">Adicionar/Editar Questão</div>
                    </div>
                </div>
                <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
                <div className="mt-8 px-4">
                    <form>
                        <div className="mb-5">
                            <label htmlFor="title">Título</label>
                            <input id="title" type="text" placeholder="Digite o título da questão" className="form-input" value={params.title} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="body">Corpo da Questão</label>
                            <ReactQuill theme="snow" value={params.body} onChange={(value) => setParams({ ...params, body: value })} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="questionType">Tipo de Questão</label>
                            <select id="questionType" className="form-select" value={params.questionType} onChange={(e) => changeValue(e)}>
                                <option value="" disabled>Selecione o tipo de questão</option>
                                <option value="Múltipla Escolha">Múltipla Escolha</option>
                                <option value="Discursiva">Discursiva</option>
                                <option value="Verdadeiro ou Falso">Verdadeiro ou Falso</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="level">Nível</label>
                            <select id="level" className="form-select" value={params.level} onChange={(e) => changeValue(e)}>
                                <option value="" disabled>Selecione o nível</option>
                                <option value="Fácil">Fácil</option>
                                <option value="Médio">Médio</option>
                                <option value="Difícil">Difícil</option>
                            </select>
                        </div>
                        <div className="mb-5">
                            <label htmlFor="discipline">Disciplina</label>
                            <input id="discipline" type="text" placeholder="Digite a disciplina" className="form-input" value={params.discipline} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="topic">Tópico</label>
                            <input id="topic" type="text" placeholder="Digite o tópico" className="form-input" value={params.topic} onChange={(e) => changeValue(e)} />
                        </div>
                        <div className="mb-5">
                            <label htmlFor="owner">Dono da Questão</label>
                            <input id="owner" type="text" placeholder="Digite o nome do dono da questão" className="form-input" value={params.owner} onChange={(e) => changeValue(e)} />
                        </div>
                    </form>
                </div>
                <hr className="my-6 border-white-light dark:border-[#1b2e4b]" />
                <div className="mt-8 px-4">
                    <div className="text-lg font-medium">Alternativas</div>
                    <div className="table-responsive mt-4">
                        <table>
                            <thead>
                                <tr>
                                    <th className='text-center'>Adicione as alternativas abaixo</th>
                                    {/* <th>Correta</th> */}
                                    <th className="w-1"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.length <= 0 && (
                                    <tr>
                                        <td colSpan={3} className="!text-center font-semibold">
                                            Nenhuma alternativa disponível
                                        </td>
                                    </tr>
                                )}
                                {items.map((item: any, index: number) => {
                                    return (
                                        <tr className="align-top" key={item.id}>
                                            <td>
                                                <label htmlFor={`alternative-${item.id}`}>Alternativa {index + 1}</label>
                                                <div className="flex">
                                                    <input
                                                        id={`alternative-${item.id}`}
                                                        type="text"
                                                        placeholder="Digite a alternativa"
                                                        className="form-input ltr:rounded-r-none rtl:rounded-l-none"
                                                        value={item.alternative}
                                                        onChange={(e) => {
                                                            const updatedItems = [...items];
                                                            updatedItems[index].alternative = e.target.value;
                                                            setItems(updatedItems);
                                                        }}
                                                    />
                                                    <div className="flex items-center justify-center border border-white-light bg-[#f1f2f3] px-3 font-semibold ltr:rounded-r-md ltr:border-l-0 rtl:rounded-l-md rtl:border-r-0 dark:border-[#17263c] dark:bg-[#1b2e4b]">
                                                        <input
                                                            type="checkbox"
                                                            className="form-checkbox border-white-light text-primary ltr:mr-0 rtl:ml-0 dark:border-white-dark"
                                                            checked={item.correct}
                                                            onChange={() => toggleCorrect(item.id)}
                                                        />
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                <button type="button" onClick={() => removeItem(item)}>
                                                    <IconX className="h-5 w-5 text-danger" />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 flex flex-col justify-between px-4 sm:flex-row">
                        <div className="mb-6 sm:mb-0">
                            <button type="button" className="btn btn-primary" onClick={() => addItem()}>
                                Adicionar Alternativa
                            </button>
                        </div>
                    </div>
                </div>
                <div className="mt-8 px-4">
                    <label htmlFor="notes">Notas</label>
                    <textarea id="notes" name="notes" className="form-textarea min-h-[130px]" placeholder="Notas..."></textarea>
                </div>
                <div className="mt-6 w-full">
                    <div className="panel">
                        <div className="flex gap-4">
                            <button type="button" className="btn btn-primary gap-2" onClick={saveQuestion}>
                                <IconSave className="shrink-0 ltr:mr-2 rtl:ml-2" />
                                Salvar
                            </button>

                            {/* <button type="button" className="btn btn-info gap-2">
                                <IconSend className="shrink-0 ltr:mr-2 rtl:ml-2" />
                                Enviar
                            </button> */}

                            <Link href="/banco-de-questoes" className="btn btn-danger gap-2">
                                Cancelar
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdicionarEditarQuestao;
