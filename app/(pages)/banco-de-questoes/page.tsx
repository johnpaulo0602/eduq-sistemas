'use client';
import IconEdit from '@/components/icon/icon-edit';
import IconEye from '@/components/icon/icon-eye';
import IconPlus from '@/components/icon/icon-plus';
import IconTrashLines from '@/components/icon/icon-trash-lines';
import { sortBy } from 'lodash';
import { DataTableSortStatus, DataTable } from 'mantine-datatable';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const BancoDeQuestoes = () => {
  const [items, setItems] = useState([
    {
      id: 4,
      title: 'O que é um algoritmo?',
      discipline: 'Fundamentos da Computação',
      topic: 'Introdução à Programação',
      level: 'Fácil',
      type: 'Discursiva',
      owner: 'Professor D',
    },
    {
      id: 5,
      title: 'Descreva o conceito de POO (Programação Orientada a Objetos).',
      discipline: 'Programação Orientada a Objetos',
      topic: 'Conceitos Básicos',
      level: 'Médio',
      type: 'Discursiva',
      owner: 'Professor E',
    },
    {
      id: 6,
      title: 'Qual a diferença entre lista encadeada e array?',
      discipline: 'Estruturas de Dados',
      topic: 'Listas',
      level: 'Difícil',
      type: 'Discursiva',
      owner: 'Professor F',
    },
    {
      id: 7,
      title: 'O que é uma chave primária em um banco de dados?',
      discipline: 'Banco de Dados',
      topic: 'Modelagem de Dados',
      level: 'Fácil',
      type: 'Múltipla Escolha',
      owner: 'Professor G',
    },
    {
      id: 8,
      title: 'Explique a diferença entre waterfall e agile.',
      discipline: 'Engenharia de Software',
      topic: 'Metodologias de Desenvolvimento',
      level: 'Médio',
      type: 'Discursiva',
      owner: 'Professor H',
    },
    {
      id: 9,
      title: 'Quais são os principais protocolos de rede?',
      discipline: 'Redes de Computadores',
      topic: 'Protocolos',
      level: 'Médio',
      type: 'Múltipla Escolha',
      owner: 'Professor I',
    },
    {
      id: 10,
      title: 'O que é virtualização em sistemas operacionais?',
      discipline: 'Sistemas Operacionais',
      topic: 'Conceitos de Virtualização',
      level: 'Difícil',
      type: 'Discursiva',
      owner: 'Professor J',
    },
    {
      id: 11,
      title: 'Quais são os princípios da segurança da informação?',
      discipline: 'Segurança da Informação',
      topic: 'Fundamentos',
      level: 'Médio',
      type: 'Múltipla Escolha',
      owner: 'Professor K',
    },
    {
      id: 12,
      title: 'Descreva o processo de desenvolvimento web com React.',
      discipline: 'Desenvolvimento Web',
      topic: 'Frameworks JavaScript',
      level: 'Difícil',
      type: 'Discursiva',
      owner: 'Professor L',
    },
    {
      id: 13,
      title: 'Qual é a diferença entre desenvolvimento nativo e híbrido em mobile?',
      discipline: 'Desenvolvimento Mobile',
      topic: 'Plataformas de Desenvolvimento',
      level: 'Médio',
      type: 'Múltipla Escolha',
      owner: 'Professor M',
    },
    {
      id: 14,
      title: 'Explique o funcionamento de uma rede neural.',
      discipline: 'Inteligência Artificial',
      topic: 'Redes Neurais',
      level: 'Difícil',
      type: 'Discursiva',
      owner: 'Professor N',
    },
    {
      id: 15,
      title: 'Quais são as fases do ciclo de vida de um projeto de TI?',
      discipline: 'Gestão de Projetos de TI',
      topic: 'Ciclo de Vida de Projetos',
      level: 'Médio',
      type: 'Múltipla Escolha',
      owner: 'Professor O',
    },
  ]);


  const [page, setPage] = useState(1);
  const PAGE_SIZES = [10, 20, 30, 50, 100];
  const [pageSize, setPageSize] = useState(PAGE_SIZES[0]);
  const [initialRecords, setInitialRecords] = useState(sortBy(items, 'title'));
  const [records, setRecords] = useState(initialRecords);
  const [selectedRecords, setSelectedRecords] = useState<any>([]);

  const [search, setSearch] = useState('');
  const [sortStatus, setSortStatus] = useState<DataTableSortStatus>({
    columnAccessor: 'title',
    direction: 'asc',
  });

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  useEffect(() => {
    const from = (page - 1) * pageSize;
    const to = from + pageSize;
    setRecords([...initialRecords.slice(from, to)]);
  }, [page, pageSize, initialRecords]);

  useEffect(() => {
    setInitialRecords(() => {
      return items.filter((item) => {
        return (
          item.title.toLowerCase().includes(search.toLowerCase()) ||
          item.discipline.toLowerCase().includes(search.toLowerCase()) ||
          item.topic.toLowerCase().includes(search.toLowerCase()) ||
          item.level.toLowerCase().includes(search.toLowerCase()) ||
          item.type.toLowerCase().includes(search.toLowerCase()) ||
          item.owner.toLowerCase().includes(search.toLowerCase())
        );
      });
    });
  }, [search]);

  useEffect(() => {
    const data2 = sortBy(initialRecords, sortStatus.columnAccessor);
    setRecords(sortStatus.direction === 'desc' ? data2.reverse() : data2);
    setPage(1);
  }, [sortStatus]);

  const deleteRow = (id: any = null) => {
    if (window.confirm('Tem certeza que deseja excluir esta questão?')) {
      if (id) {
        setRecords(items.filter((user) => user.id !== id));
        setInitialRecords(items.filter((user) => user.id !== id));
        setItems(items.filter((user) => user.id !== id));
        setSelectedRecords([]);
        setSearch('');
      } else {
        let selectedRows = selectedRecords || [];
        const ids = selectedRows.map((d: any) => {
          return d.id;
        });
        const result = items.filter((d) => !ids.includes(d.id as never));
        setRecords(result);
        setInitialRecords(result);
        setItems(result);
        setSelectedRecords([]);
        setSearch('');
        setPage(1);
      }
    }
  };

  return (
    <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
      <div className="invoice-table">
        <div className="mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
          <div className="flex items-center gap-2">
            <button type="button" className="btn btn-danger gap-2" onClick={() => deleteRow()}>
              <IconTrashLines />
              Excluir
            </button>
            <Link href="banco-de-questoes/add-questions" className="btn btn-primary gap-2">
              <IconPlus />
              Adicionar Nova
            </Link>
          </div>
          <div className="ltr:ml-auto rtl:mr-auto">
            <input type="text" className="form-input w-auto" placeholder="Buscar..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        <div className="datatables pagination-padding">
          <DataTable
            className="table-hover whitespace-nowrap"
            records={records}
            columns={[
              {
                accessor: 'title',
                sortable: true,
                title: 'Título da questão',
                render: ({ title }) => (
                  <Link href="/apps/questao/visualizar">
                    <div className="font-semibold text-primary underline hover:no-underline">{title}</div>
                  </Link>
                ),
              },
              {
                accessor: 'discipline',
                sortable: true,
                title: 'Disciplina',
              },
              {
                accessor: 'topic',
                sortable: true,
                title: 'Tópico',
              },
              // {
              //   accessor: 'level',
              //   sortable: true,
              //   title: 'Nível de dificuldade',
              // },
              // {
              //   accessor: 'type',
              //   sortable: true,
              //   title: 'Tipo',
              // },
              {
                accessor: 'owner',
                sortable: true,
                title: 'Criado por',
              },
              {
                accessor: 'action',
                title: 'Ações',
                sortable: false,
                textAlignment: 'center',
                render: ({ id }) => (
                  <div className="mx-auto flex w-max items-center gap-4">
                    <Link href={`/apps/questao/editar?id=${id}`} className="flex hover:text-info">
                      <IconEdit className="h-4.5 w-4.5" />
                    </Link>
                    <Link href={`/apps/questao/visualizar?id=${id}`} className="flex hover:text-primary">
                      <IconEye />
                    </Link>
                    <button type="button" className="flex hover:text-danger" onClick={() => deleteRow(id)}>
                      <IconTrashLines />
                    </button>
                  </div>
                ),
              },
            ]}
            highlightOnHover
            totalRecords={initialRecords.length}
            recordsPerPage={pageSize}
            page={page}
            onPageChange={(p) => setPage(p)}
            recordsPerPageOptions={PAGE_SIZES}
            onRecordsPerPageChange={setPageSize}
            sortStatus={sortStatus}
            onSortStatusChange={setSortStatus}
            selectedRecords={selectedRecords}
            onSelectedRecordsChange={setSelectedRecords}
            paginationText={({ from, to, totalRecords }) => `Mostrando ${from} a ${to} de ${totalRecords} entradas`}
          />
        </div>
      </div>
    </div>
  );
};

export default BancoDeQuestoes;
